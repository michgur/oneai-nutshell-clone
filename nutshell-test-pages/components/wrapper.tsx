export const Wrapper = ({ children }: any) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          max-width: 70ch;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};
