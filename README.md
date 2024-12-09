# Coding Challenge: Create a Combobox with Arrow Navigation

## Objective:

Create a React component that acts as an accessible combobox (autocomplete) with support for keyboard navigation using arrow keys.

For more information about comboboxes, see the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).



https://github.com/user-attachments/assets/cd6ad90e-20ea-42af-817c-4674fc9dc955



## Tech Stack

- React
- TypeScript
- Vite

## Requirements:

### Instructions

- Fork this repository.
- Clone the forked repository.
- Run `npm install` to install the dependencies.
- Run `npm run dev` to start the development server.
- Implement the combobox component.
- All code should be written in TypeScript.
- All boiler plate code can be modified or deleted, this is just a starting point.
- Do not use any libraries not included in this repository

Push your changes to your branch and submit the link to the PR in an email. Let us know if there are any changes to how we need to run this project.

### Core Features

- Render an input box where users can type to filter a predefined list of options.
- Display a dropdown of matching options below the input.
- Highlight the currently selected option as the user navigates with the Up and Down arrow keys.
- Allow the user to select an option with:
  - Enter key.
  - Mouse click.
- Close the dropdown when:
  - The user presses the Escape key.
  - The input loses focus.

### Behavior

The dropdown should only show when the input is focused and there are matching results.
Typing in the input should filter the list in real-time (case-insensitive).
If no matches are found, display a "No results" message.

### Accessibility:

- Ensure the component is keyboard-navigable.

### Bonus (Optional if time permits):

- Add appropriate ARIA attributes (aria-expanded, aria-controls, etc.).
- Allow for multiple selection (tags-style).
