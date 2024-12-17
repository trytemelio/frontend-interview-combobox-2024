# Index
- [Challenge](#coding-challenge-create-a-combobox-with-arrow-navigation)
- [Tech Stack](#tech-stack)
- [To run the project](#to-run-the-project)
- [Video explanation](#video-explanation)
- [What did I do - (text explanation)](#what-did-i-do)



# Coding Challenge: Create a Combobox with Arrow Navigation

## Objective:

Create a React component that acts as an accessible combobox (autocomplete) with support for keyboard navigation using arrow keys.

For more information about comboboxes, see the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).



https://github.com/user-attachments/assets/cd6ad90e-20ea-42af-817c-4674fc9dc955


## Tech Stack

- React
- TypeScript
- Vite


## To run the project:
- Run `npm install`
- Run `npm run dev`

## Video Explanation
<video width="600" controls>
  <source src="./src/assets/explanation-video/combobox.mp4" type="video/mp4">
  Something went wrong
</video>

[Click here to watch the video](https://youtu.be/UyfpaM1PtJ4)



## What did I do:

### Fetch Countries
- To list the countries I used the free [REST Countries](https://restcountries.com/) API.
- Fetched the countries using JavaScript's `fetch` method
- Used `useCallback` (`getCountries`) to memoize the response. Since the response is always the same I only make the API call once.
- Applied `useState` (`[countries, setCountries]`) to set my predefined options list.

### Search and Filter Behavior
- Implemented the `search` state to control the input value.
- Created the `handleSearch` function to:
  - Use React's `startTransition` to improve performance with non-urgents updates (like `onChange` input events).
  - Control list opening.
- To filter the countries, I used `useMemo` to improve performance by memoizing the response.
- Cleaned the search result (removing symbols, empty spaces and special characters) by calling `cleanString` function. This is also applies to country names for more accurate searches.

### Selection Behavior

- Implemented the `handleSelection` function to:
  - Update the `search` state with full country name (appears in the input).
  - Close the list.

### Keyboard Behavior
- Implement keyboard behavior with the `handleKeyDown` function, which handles keyboard events (`ArrowDown`, `ArrowUp`, `Enter`, `Escape`).
- Used the `highlightedIndex` state to track which `<li>` (list item) is "selected", changing its class to match `hover` style used in mouse events.
    - `ArrowDown` - Incremented the previous value by 1, starting at 0 if the previous value is `null`.
    - `ArrowUp` - Decremented the previous value by 1.
    - `Enter` -  Applied `handleSelection` based on the current `highlightedIndex` (the list item currently selected).
    - `Escape`( AKA `Esc`)- Close the options list.
  - Added ARIA attributes so the elements could be identified:
    - `aria-controls="autocomplete-list"` - Ensures the input controls the element with the ID `'autocomplete-list'` (the `<ul>` ID).
    - `aria-autocomplete="list"` - Indicates that input has autocomplete behavior.

### Close list Behavior
- Added a `useEffect` hook to watch for mouse events (`mousedown`) so the list could close when clicking outside the input or the list.

#### PS: Testing wasn't applied because the `README.md` project guidelines highlighted not to add any external libraries that already exist in the project.