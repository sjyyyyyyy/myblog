// import React from 'react';
// import clsx from 'clsx';
// import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';

// import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <h1 className="hero__title">{siteConfig.title}</h1>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/hello">
//             Docusaurus Tutorial - 5min ⏱️
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default function Home() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <Layout
//       title={`Hello from ${siteConfig.title}`}
//       description="Description will go into a meta tag in <head />">
     
     
      {/* <HomepageHeader /> */}
      {/* <main>
        <HomepageFeatures />
      </main> */}
    {/* </Layout>
  );
} */}

import React from 'react';
import Layout from '@theme/Layout';
// import Top from '@site/src/components/TopPart';
// import Bottom from '@site/src/components/Bottom';
// import Middle from '@site/src/components/Middle';
export default function Home() {
  return (
    <Layout title="Hello" description="Hello React Page">
{/* <Top />
  <Middle />
<Bottom /> */}
    </Layout>
  );
}