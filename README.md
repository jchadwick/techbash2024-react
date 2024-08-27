# Getting Started With React - TechBash 2024

Welcome to the repository for the "Getting Started With React" presentation at TechBash 2024. This repository contains the slide deck and code examples used during the presentation.

## Repository Structure

- [`end/`](./end): Contains the final version of the code examples and slides.
- [`start/`](./start): Contains the starter code for the examples.
- [`README.md`](./README.md): This README file.
- [`slides.md`](./slides.md): The slide deck for the presentation.

## Running the Examples

> Prerequisites:
> - Node.js (with npm)

To run the examples, use the following command, replacing `<folder>` with the example you want to run.

```sh
npx json-server db.json --static ./<FOLDER>
```

For example:

1. [`start/`](./start) directory, for the initial HTML/JS application
    ```sh
    npx json-server db.json --static ./start
    ```
2. [`end/`](./end) directory, for the converted React application
    ```sh
    npx json-server db.json --static ./end
    ```



## License

This project is licensed under the Unlicense license - see the LICENSE file for details.
