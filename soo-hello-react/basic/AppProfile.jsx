import "./App.css";
import Profile from "./components/Profile.jsx";

function AppProfile() {
  const onClickBtn = (e) => {
    console.log(e);
    alert("버튼이 클릭되었습니다.");
  };
  return (
    <div className="main">
      <button type="button" onClick={onClickBtn}>
        버튼
      </button>
      <Profile
        imgUrl="https://plus.unsplash.com/premium_photo-1665952050053-31ac47c6ff4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3V0ZXxlbnwwfHwwfHx8MA%3D%3D"
        name="Kevin"
        job="front-end Developer"
        isNew={true}
      />
      <Profile
        imgUrl="https://images.unsplash.com/photo-1497752531616-c3afd9760a11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3V0ZXxlbnwwfHwwfHx8MA%3D%3D"
        name="Jame"
        job="Devops Developer"
      />
      <Profile
        imgUrl="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN1dGV8ZW58MHx8MHx8fDA%3D"
        name="Poo"
        job="Back-end Developer"
      />
    </div>
  );
}

export default AppProfile;
