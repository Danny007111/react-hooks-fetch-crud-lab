import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // Get from fetch
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((question) => setQuestions(question));
  }, []);

  // add delete and change PARENT functions 

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const newQuestions = questions.filter((q) => q.id !== id);
        setQuestions(newQuestions);
      });
  }

  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      
      />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
