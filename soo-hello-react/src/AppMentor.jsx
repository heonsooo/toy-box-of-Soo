import React, { useState } from "react";

export default function AppMentor() {
  const [mentor, setMentor] = useState({
    name: "soo",
    title: "FE개발자",
    mentorObj: {
      name: "bob",
      title: "시니어개발자",
    },
  });
  const handlePropmtInputMentorName = () => {
    const name = prompt("멘토의 이름을 입력해주세요.");
    setMentor((prev) => ({
      ...prev,
      mentorObj: { ...prev.mentorObj, name },
    }));
  };
  const handlePropmtInputMentorTitle = () => {
    const title = prompt("멘토의 타이틀을 입력해주세요.");
    setMentor((prev) => ({
      ...prev,
      mentorObj: { ...prev.mentorObj, title },
    }));
  };
  return (
    <div>
      <h1>AppMentor</h1>
      <h3>
        {mentor.name}는 {mentor.title}
      </h3>
      <p>
        {mentor.mentorObj.name} 은 {mentor.mentorObj.title}
      </p>
      <button onClick={handlePropmtInputMentorName}>멘토 이름 바꾸기</button>
      <button onClick={handlePropmtInputMentorTitle}>멘토 타이틀 바꾸기</button>
    </div>
  );
}
