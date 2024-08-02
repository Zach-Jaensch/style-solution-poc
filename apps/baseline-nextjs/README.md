# `unified-library-app` Next.js app

This is a [Next.js](https://nextjs.org/) project.

## Getting started

To run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn more

To learn more about Next.js, take a look at the following resources:

- [Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Pages with search

As we are leveraging static rendering and ISR for the majority of our app, we can not (out of the box) use server side rendering for generating the search results (for example: `host.com/en-US/library?q=some+search+query`). To get around this issue, co-located with the initial page, is a search page, which will use the same default export as the initial page. This search page switching occurs in the middleware under `"Handle searching"`.

```
[locale]
    library
        index.page.tsx
        search.page.tsx
```

```typescript
// /[locale]/library/index.page.tsx
export default function Page() {
  return <>Some content</>
}

Page.getLayout = function GetLayout(page) {
  return (
    <>
      Initial page layout
      {page}
    </>
  )
}

export function getStaticProps() {
  return { props: { /* some props */ }}
}
```

```typescript
// /[locale]/library/index.page.tsx
import BasePage from "./index.page.tsx";

// This is needed to ensure the instances are different.
// Important for attaching different layouts
export default function Page(props) {
  return <BasePage {...props} />
}

Page.getLayout = function GetLayout(page) {
  return (
    <>
      Search page layout
      {page}
    </>
  )
}

export function getServerSideProps() {
  return { props: { /* some props */ }}
}
```
