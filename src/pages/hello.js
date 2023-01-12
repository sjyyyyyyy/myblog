import React from 'react';
import Layout from '@theme/Layout';
import Top from '@site/src/components/TopPart';
import Bottom from '@site/src/components/Bottom';
import Middle from '@site/src/components/Middle';
export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
<Top />
  <Middle />
<Bottom />
    </Layout>
  );
}