import React, { useState } from "react";

export default function AppMentors() {
  const [reactCo, setMentor] = useState({
    name: "soo",
    title: "FE개발자",
    mentors: [
      { id: 1, name: "bob", title: "시니어 DevOps 개발자" },
      { id: 2, name: "james", title: "시니어 FE 개발자" },
      { id: 3, name: "kew", title: "시니어 BE 개발자" },
    ],
  });
  const handlePropmtInputMentorTitle = () => {
    const name = prompt("변경할 멘토의 이름을 입력해주세요.");
    const changeTitle = prompt("선택한 멘토의 변경할 타이틀을 입력해주세요.");

    if (!reactCo.mentors.some((e) => e.name === name)) {
      alert("멘토의 이름을 확인해주세요.");
    }
    setMentor((prev) => ({
      ...prev,
      mentors: prev.mentors.map((mentor) => {
        if (mentor.name === name) {
          return { ...mentor, title: changeTitle };
        }
        return { ...mentor };
      }),
    }));
  };
  return (
    <div>
      <h1>AppMentors</h1>
      <h3>
        {reactCo.name}는 {reactCo.title}
      </h3>
      <ul>
        {reactCo.mentors.map((mentor) => {
          return (
            <li key={mentor.id}>
              {mentor.name}은 {mentor.title}
            </li>
          );
        })}
      </ul>
      <button onClick={handlePropmtInputMentorTitle}>멘토 타이틀 바꾸기</button>
    </div>
  );
}
