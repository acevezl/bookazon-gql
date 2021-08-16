# MERN app with Google API
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Refactpred a functioning Google books API search engine built with RESTful API into GraphQL API with Apollo Server. 

See the app live here: https://dramasearch.herokuapp.com/
(As of 8/15 There is a general Heroku error due to version incompatibility)

## Table of Contents
- [MERN app with Google API](#mern-app-with-google-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Code](#code)
    - [App.js](#appjs)
  - ["Static" components: Home, About Me, Resumé](#static-components-home-about-me-resumé)
    - [Home](#home)
  - ["Dynamic" components: My code doodles, and Contact](#dynamic-components-my-code-doodles-and-contact)
    - [My code doodles (Project List)](#my-code-doodles-project-list)
    - [Contact](#contact)
- [Questions](#questions)

## Installation

This utilizes REACT, which requires the Create React App (CRA) CLI to bootstrap the application. On the root folder, I've ran the following command:

```
npx crate-react-app photo-port
```
Once the app was created, I've developed the appropriate components for each section of my portfolio:

* Nav
  * Contains the top navigation of the site.
* Home
  * Contains the home page of the site, the component is shown by default.
* About
  * Contains the About Me section of the site.
* ProjectList
  * Contains my list of projects, this component uses `Project` to print each project's card
* Project
  * This is a unique component called several times to list all projects in the projects JSON array.
* Cntact
  * Contains a Contact Form (It does not send e-mails, as I do not want people reaching out to me yet)
* Resume
  * Contains the Resumé section


## Code

### App.js
This is the core script to consolidate all the components (sections) of my portfolio. Here's an overview of the code:

1. Import React, useState, and useEffect to control the App and the props send to each component. Additionally, import all the components:
```
import React, { useState, useEffect } from 'react';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import ProjectList from './components/ProjectList';
import Contact from './components/Contact';
import Resume from './components/Resume';

[...]

```

2. The main function `App()` controls the full application. There is an array for `categories` and another one for `projects`. 

```
function App() {

  const [ categories ] = useState([
    'Home','About me','My code doodles','Resumé','Contact'
  ])

  const [ projects ] = useState([
    {
      name: 'HausKeepr',
      class: 'hauskeepr',
      short_description: 'A full-stack MVC application',
      long_description: 'My very own concept of an MVC application using full stack. HausKeepr is a gig-economy app designed to connect housekeepers to client or working professionals, allowing for an easy and convenient way of getting assistance on house work.',
      image: 'hauskeepr-dashboard.png',
      link: 'https://hauskeepr-mvp.herokuapp.com/',
      github: 'https://github.com/patricklago21/hausKeepr/'
    },
    
    [...]

  ]);
```

3. Declare `currentCategory` and `setCurrentCategory` to keep track of the category (section) selected by the user. Here I'm also using `useEffect` to update the `document.title` every time a new category (section) is selected.

`Note:` I'm using `useEffect` here instead of in doing it in every section to reduce code redundancy. Technically I could follow the class module, but that just gets the code dirty.

```
  const [ currentCategory, setCurrentCategory ] = useState( categories[0] );

  useEffect( () => {
    document.title = 'Luis Arnaut | ' + currentCategory;
  }, [currentCategory]);
```

4. I've declared a function to render each category (section) selected by the user. When a user clicks on a menu on the top navigation, this function will discern what to render.

Check out how I'm calling `{renderPage()}` under the `body-container` section, which will render each component as needed. 

`Note:` I'm not calling the `Project` component here because the logic to render each card is on the `ProjectList` component.

```
  const renderPage = () => {

    switch(currentCategory) {
      case 'About me': return(<About currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>);
      case 'My code doodles': return(<ProjectList currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} projects={projects}/>);
      case 'Contact': return(<Contact/>);
      case 'Resumé': return(<Resume/>);
      default: return(<Home currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>);
    }

  }

  return (
    <main className='main' id='main-container'>
      <Nav 
        categories={categories}
        setCurrentCategory={setCurrentCategory}
        currentCategory={currentCategory}
      />
      <section className='body-container'>
        {renderPage()}
      </section>
      <Footer/>
    </main>
  );
}

export default App;
```

## "Static" components: Home, About Me, Resumé
These three components are called to display the respective section. I'm calling these "Static" because they don't have any complicated logic. For example:

### Home
I'm only passing setCurrentCategory because I've added a button for the shopper to go to the Project List, otherwise there is no other logic. It simply displays the JSX on the screen.

```
const Home = ( props ) => {

    const {
        setCurrentCategory
    } = props;

    return(
        <section className='home'>
            <div className='intro'>
                <span className='intro-title-top'>Hello, I'm</span>
                <h1 className='intro-title'>Louis Arnaut</h1>
                <h2 className='intro-subtitle'>A full-stack MERN developer</h2>
                <button className='btn btn-primary' onClick={ () => { setCurrentCategory('My code doodles') } }>View my code doodles</button>
                <div className='badges'>
                    <img src={require(`../../assets/images/mern.png`).default} alt="Mongo DB"/>
                    <img src={require(`../../assets/images/html-badges.png`).default} alt="HTML CSS JS"/>
                    <img src={require(`../../assets/images/apollo-graphql-json-api.png`).default} alt="Apollo GraphQL JSON REST:API"/>
                    <img src={require(`../../assets/images/logo-mysql.png`).default} alt="MySQL"/>
                </div>
            </div>
            <div className='headshot'>
            </div>
        </section>
    )

}

export default Home;
```

About me and Resumé are very similar. Please feel free to check the code directly.

## "Dynamic" components: My code doodles, and Contact
I'm calling these "dynamic" because they have a bit more logic involved. Let's review each of them:

### My code doodles (Project List)
This coded utilizes `Project` which is a single component that displays a `project card` using a `project` object sent as a prop. The list of projects is passed as a prop to `ProjectList` and, using a `.map` it repeats each project:

```
import Project from '../Project';

const ProjectList = ( props ) => {

    const {
        projects
    } = props;

    return(
        <section className='projects'>
            <h2>My code doodles</h2>
            <div className='project-list '>
                {projects.map((project, i) => (
                    <Project project={project}/>
                ))}
            </div>
        </section>
    )

}

export default ProjectList;
```

And here's `Project`, I'm taking each `project` from the `.map` function:

```
const Project = ( props ) => {

    const {
        project
    } = props;

    return (
        <div className='card mb-3'>
            <img src={require(`../../assets/images/${project.image}`).default} className='card-img-top' alt=''/>
            <div className='card-body'>
                <h5 className='card-title'>{project.name}</h5>
                <p className='card-text'>{project.short_description}</p>
                <p className='card-text project-description'>{project.long_description}</p>
                <a href={`${project.link}`} target='_blank' rel='noreferrer' alt='Click here to see the live project'><i className='fs-2 bi-box-arrow-up-right me-3'/></a>
                <a href={`${project.github}`} target='_blank' rel='noreferrer' alt='Click here to see the Github repo'><i className='fs-2 bi-github'/></a>
            </div>
        </div>
    )
}

export default Project;
```

### Contact
This is the longest component, mainly because it requires field validations, and a function to handle the form submit (and clear the fields after submission).

`Note:` I'm using Bootstrap styles to format the form and error messages.
```
import { useState } from "react";
import { validateEmail } from "../../utils/helpers";

const Contact = ( props ) => {

    const [ formState, setFormState ] = useState(
        {
            name: '',
            email: '',
            message: ''
        }
    );

    const [ errorMessage, setErrorMessage ] = useState('');

    const { name, email, message } = formState;

    function handleChange(event) {

        if (event.target.name === 'email') {
            const isValid = validateEmail(event.target.value);
            setErrorMessage(!isValid ? 'Your email is invalid' : '')
        } else {
            setErrorMessage(!event.target.value.length ? `Your ${event.target.name} is required.` : ``);
        }

        if (!errorMessage) {
            setFormState({ ...formState, [ event.target.name ] : event.target.value })
        }

    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formState);
    }

    return(
        <section className='contact'>
            <h2 className='col-12'>Contact Me</h2>
            <div className='contactForm mb-5'>
                <form id='contat-form' className='mb-3' onSubmit={handleSubmit}>
                    <div className='form-floating mb-3'>
                        <input className='form-control' type='text' id='name' name='name' defaultValue={name} onBlur={handleChange}/>
                        <label htmlFor='name'>Name:</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <input className='form-control' type="email" id='email' name="email" defaultValue={email} onBlur={handleChange}/>
                        <label htmlFor="email">Email:</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <textarea className='form-control' name="message" id='message' defaultValue={message} onBlur={handleChange}/>
                        <label htmlFor="message">Message:</label>
                    </div>
                    {
                        errorMessage && (
                            <div className='alert alert-danger'>
                                {errorMessage}
                            </div>
                        )
                    }
                    <button data-testid="button" className='btn btn-secondary' type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;
```

# Questions
E-mail me: <lou.arnaut@gmail.com>
Checkout my Github profile: [acevezl](https://github.com/acevezl)