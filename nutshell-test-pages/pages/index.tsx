import type { NextPage } from "next";
import Link from "next/link";
import { Wrapper } from "../components/wrapper";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <h1>Nutshell test app</h1>
      <ul>
        <li>
          <Link href="/article">article</Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Home;
