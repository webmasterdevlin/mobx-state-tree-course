# Mobx State Tree Course

```zsh
$ git clone https://github.com/webmasterdevlin/mobx-state-tree-course-starter.git
$ cd mobx-state-tree-course-starter
$ npm installs
$ npm run start:fullstack
```

The React app, and the fake web service will run concurrently.

![screenshot](./screenshot.png)

### Best practices in writing tests

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

- always use eslint-plugin-testing-library and eslint-plugin-jest-dom
- always use screen
- use screen.getByRole instead of screen.getByTestId
- use screen.queryByRole only when expecting not.toBeInTheDocument
- use await screen.find\* instead of await waitFor/wait
- if necessary, use await waitFor instead of await wait
- use userEvent instead of fireEvent
- avoid userEvent or fireEvent insides callbacks of waitFor as much as possible
