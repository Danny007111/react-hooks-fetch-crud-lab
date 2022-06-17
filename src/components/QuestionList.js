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

  // Delete from fetch
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const newQuestions = questions.filter((q) => q.id !== id);
        setQuestions(newQuestions);
      });
  };

  // onChange from fetch
  function handleChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((newQuestion) => {
        const newQuestions = questions.map((q) => {
          if (q.id === newQuestion.id) return newQuestion;
          return q;
        });
        // call new questions
        setQuestions(newQuestions);
      });
  }

  const questionItems = questions.map((q) => (
    <QuestionItem
      key={q.id}
      question={q}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleChange}
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
