import { useQuery } from "graphql-hooks";
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { MDXProvider } from '@mdx-js/react';
import ReactMarkdown from 'react-markdown';

const Blurb = styled.div`
  outline: 4px solid red;
  color: ${(props) => props.color};

  h1 {
    font-size: 3rem;
  }
`;

const SellingPoint = styled.div``

// const SellingPoint = ({ children }) => (
//   <Markdown>
//     {children}
//   </Markdown>
// );

// Class names passed through MDX is not picking up by tailwind
const Button = ({ url, className, children }) => (
  <a href={url} className={`mt-6 ${className}`}>{children}</a>
)

const components = {
  Blurb: (props) => <Blurb {...props} />,
  Button: ({ url, className, children }) => <Button url={url} className={className}>{children}</Button>,
  SellingPoint: (props) => <SellingPoing {...props} />,
}

const Duplicate = () => {
  const DATA_QUERY = `query {
    datoPage: pageUnique(filter: {url: {eq: "/test-page"}}) {
      url
      content {
        entryId
        content
        assets {
          basename
          url
          alt
        }
      }
    }
  }`;

  const { loading, error, data } = useQuery(DATA_QUERY);
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";

  console.log(data);

  return (
    <>
      {/* <section>{data.datoPage.content[3].content}</section> */}
      <section className="grid grid-cols-2 gap-x-20 items-center mt-8">
      {/* Adding styles to children is not very readable */}
      <div className={`[&>div>h1]:text-4xl [&>div>h1]:font-bold [&>div>p]:mt-6`}>
        {/* Markdown automatically add a div as a wrapper to the mdx items */}
        <Markdown
          options={{
            overrides: {
              Blurb,
              Button,
            },
          }}
          >{data.datoPage.content[1].content}</Markdown>
      </div>
      <picture>
        <img src={data.datoPage.content[1].assets[0].url} alt={data.datoPage.content[1].assets[0].url} />
      </picture>
    </section>
    <section className={'[&>div]:grid [&>div]:grid-cols-4 [&>div]:gap-x-6'}>
      <Markdown options={{
        overrides: {
          SellingPoint
        },
      }}>{data.datoPage.content[2].content}</Markdown>
    </section>
    </>
  )
}

export default Duplicate;