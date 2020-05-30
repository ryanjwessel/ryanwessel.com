import matter from "gray-matter";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";

const Index = ({
  title,
  headline,
  description,
  github,
  linkedin,
  twitter,
  posts,
}) => {
  return (
    <Layout
      pathname="/"
      title={title}
      headline={headline}
      description={description}
      github={github}
      linkedin={linkedin}
      twitter={twitter}
    >
      <section>
        <BlogList posts={posts} />
      </section>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const {
    title,
    headline,
    description,
    github,
    linkedin,
    twitter,
  } = await import(`../data/config.json`);
  // Get posts & context from folder
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    return keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      const value = values[index];
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default);
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      };
    });
  })(require.context("../posts", true, /\.md$/));

  return {
    props: {
      posts,
      title,
      headline,
      description,
      github,
      linkedin,
      twitter,
    },
  };
}
