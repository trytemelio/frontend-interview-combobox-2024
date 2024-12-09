# Coding Challenge: Create a Combobox with Arrow Navigation

## Objective:

Create a React component that acts as an accessible combobox (autocomplete) with support for keyboard navigation using arrow keys.

## Requirements:

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
- Add appropriate ARIA attributes (aria-expanded, aria-controls, etc.).

### Bonus (Optional if time permits):

- Allow for multiple selection (tags-style).
