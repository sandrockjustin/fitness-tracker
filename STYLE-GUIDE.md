# Styling Guide

## Introduction

Our application implements MaterialUI in order to create a pleasant viewing experience for our end-users. We use a combination of in-line styling (when necessary) but we have also established some basic reusable styles within `client/components/styles.js`. We will review how some of these styles are used in our application later, but first we are going to discuss some of the other UI features that exist in the application as well as general practices.

We decided to use a color gradient to make the user interface 'pop' for the user. The style that we chose was from an [example gradient repository](https://gradient.page/ui-gradients/cheer-up-emo-kid); we settled on this color because we found it humorous but also pleasant for viewing purposes. A different gradient may be chosen, but we advise selecting a gradient carefully as it might conflict with other user interface elements.

Our application also features a `Light Mode` and `Dark Mode` toggle button that is made available to end-users at the top-left of our page (above navigation bar). This references a section within the `client/components/styles.js` file. Please reference the `lightMode` and `darkMode` options within this file to further your understanding of how this works; it is implemented by using the MaterialUI `createTheme` function and then is applied within the `App.jsx` component file where it is managed as a state.

## Explanation of Styles

As you read through these sections, please be aware that these styles are not necessarily restricted for use in these categories. Some styles are used throughout the application despite their intended category.

### Basic Styling

The `text` style is used to affect the overall styling, font, and size of text across our application.


### Navigation Components

The `navBar` style is used to style the navigation bar; it simply sets a background gradient for the container.

The `navButtons` style is used for styling the 'buttons' or directories contained on the navigation bar.

The `navAccountOptions` style is used in order to justify the account/profile options to the right side of the navigation bar, separating them from other navigation buttons.

The `deleteAccButton` style is used in order to format the delete account button so that it is very apparent that this is a dangerous operation.

### Workouts Components

The `box` style is used to style a container for a list of _workouts_. It ensures that the list is scrollable and that the items are distributed correctly for a list of workouts.

The `workouts` style is used to style each individual _workout_ that appear in a list of _workouts_.

The `workoutSaved` style is similar to the _workouts_ style, however saved workouts have a different set of elements and thus require different styling.

The `workoutSelected` style is used to style a _view_ for a workout when it is _selected_. It was implemented with the intent of making a selected workout more legible.

The `iconButton` style is used to affect the size of an icon container and to implement hover effects for user feedback.

The `addButton` style is used to style the button containers within displayed _workouts_. In particular, it's used to style a container for the 'add workout' button within each individual workout.

### Routines Components

The `box4Routines` style is used to style a container for a list of _routines_. It ensures that the list is scrollable and that the items are presented correctly. We decided to separate this from the `box` component due to errors that we were encountering with MaterialUI.

The `routineAdd` style is used to style the button for creating a routine.


