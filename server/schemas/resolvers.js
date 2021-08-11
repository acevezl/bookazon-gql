const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        /* Get logged user info */
        me: async ( parent, args, context ) => {
            if (context.user) {
                const userData = await User.findOne(
                    { _id: context.user_id }
                )
                .select('--v -password')
                .populate('savedBooks');

                return userData;
            }
            throw new AuthenticationError('You\'re not logged in');
        },

        /* Get book by Id*/
        book: async ( parent, { _id }) => {
            return Book.findOne({ _id })
        }
    },
    Mutation: {
        /* Sign up (add) user */
        addUser: async ( parent, args ) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user};
        },

        /* Login user */
        login: async ( parent, { email, password } ) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        /* add book */
        addBook: async ( parent, args, context ) => {
            if (context.user) {
                const book = await Book.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book._id } },
                    { new: true }
                );

                return book;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        /* delete a book */
        deleteBook: async ( parent, args, context ) => {
            if (context.user) {
                const book = await Book.deleteOne({ ...args});

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book._id } },
                    { new: true }
                );
            }

            throw new AuthenticationError('You need to be logged in!';)
        }
    }
}

module.exports = resolvers;