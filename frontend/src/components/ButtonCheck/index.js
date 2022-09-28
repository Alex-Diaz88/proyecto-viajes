import { useState } from "react";

const ButtonCheck = () => {
  const [vote, setVote] = useState(0);
  /*  const [dislike, setDislike] = useState(0); */

  const [voteActive, setvoteActive] = useState(false);
  /*   const [dislikeActive, setDislikeActive] = useState(false); */

  function votef() {
    if (voteActive) {
      setvoteActive(false);
      setVote(vote - 1);
    } else {
      setvoteActive(true);
      setVote(vote + 1);
    }
  }

  return (
    <div>
      <button
        onClick={votef}
        className={[voteActive ? "active-vote" : null, "button"].join("")}
      >
        Like{vote}
      </button>
    </div>
  );
};

export default ButtonCheck;

/*       <button onClick={dislikef} className={[dislikeActive ? "active-dislike" : null, "button"].join("")}>
  Dislike{dislike}
</button> */
/*       if (dislikeActive) {
        setDislikeActive(false);
        setLike(like + 1);
        setDislike(dislike - 1);
      } */

/*   function dislikef() {
    if (dislikeActive) {
      setDislikeActive(false);
      setDislike(like - 1);
    } else {
      setDislikeActive(true);
      setDislike(like + 1);
      if (dislikeActive) {
        setlikeActive(false);
        setDislike(dislike + 1);
        setLike(dislike - 1);
      }
    }
  } */
