<div align="center">
  <img src="public/images/logo.png" width="200">
  <h1>Dynamic Flying</h1>
</div>
<br>

## About

This repo contains the source code for the Dynamic Flying website.

Any questions about the competition rules should be directed to the committee at isc-dynamic@fai.org.

## Contributing

This website is built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), and [React](https://react.dev).  

### Set up

If you want to set up the environment locally, you can clone the repo and run `npm install` to install the dependencies.  
If you want to use Docker, you can use the devcontainer in the `.devcontainer` folder.

### Repo structure

Here's a summary of the most notable directories in the repo:
- `pages`: the pages of the website, following the Next.js file-based routing system.
- `components`: the React components used in the website.
- `public`: static files that are served directly by the web server.
- `data`: the data used by the website, such as competitions rules and events
- `utils`: utility functions used by the website.

There are two persistent branches:
- `main`: serves as the staging, and is automatically previewed [here](https://dynamicflying.github.io/preview/dynamicflying/website/branch/main)
- `stable`: serves as the production branch, and is automatically deployed on GitHub Pages on hte official website domain

When opening a PR, a preview will be automatically deployed to GitHub Pages, and a link will be posted in the PR: this is a way to test the cahnges before merging them to `main`.

### Running

To run a local development server, run `npm run dev`.  
If you want to export a static build of the website, run `npm run build`.

## License

This project is licensed under the [MIT License](LICENSE).
