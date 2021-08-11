const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Thought } = require('../../../deep-thoughts/server/models');

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
            return Thought.findOne({ _id })
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
        }
    }
}
