import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { icons } from "../data";

let currentNumber = 0;

const Card = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iconStyle, setIconStyle] = useState(null);
  const contentRef = useRef(null);
  const statementRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      try {
        const { data } = await axios.get(
          "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users"
        );
        setPeople(data);
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  let getContent;
  const handleClick = () => {
    const getData = async () => {
      setIsLoading(false);
      try {
        const { data } = await axios.get(
          "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users"
        );
        setPeople(data);
        const randomNum = () => {
          return Math.floor(Math.random() * data.length);
        };
        currentNumber = randomNum();
        getContent = statementRef.current;
        getContent.textContent = "My name is:";
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  };

  const handleHover = (index) => {
    setIconStyle(iconStyle === index ? null : index);
    getContent = contentRef.current;
    let getStatemenet = statementRef.current;

    icons.forEach((each) => {
      const { id, iconName, icon, statement } = each;
      if (id === index) {
        if (iconName === "user") {
          getContent.textContent = people[currentNumber].profile.firstName;
          getStatemenet.textContent = statement;
        } else if (iconName === "email") {
          getContent.textContent = people[currentNumber].email;
          getStatemenet.textContent = statement;
        } else if (iconName === "gender") {
          getContent.textContent = people[currentNumber].profile.gender;
          getStatemenet.textContent = statement;
        } else if (iconName === "address") {
          getContent.textContent = people[currentNumber].profile.address;
          getStatemenet.textContent = statement;
        } else if (iconName === "phone") {
          getContent.textContent = people[currentNumber].profile.phoneNumber;
          getStatemenet.textContent = statement;
        } else {
          getContent.textContent = people[currentNumber].socials.facebook;
          getStatemenet.textContent = statement;
        }
      }
    });
  };

  return (
    <>
      <section className="card-sect">
        <header className="top-card"></header>
        <div className="img-con">
          {isLoading ? (
            <img src={people[currentNumber].profile.avatar} alt="Avatar" />
          ) : (
            <div className="check-loading"></div>
          )}
        </div>
        <div className="bottom-card">
          <h3 ref={statementRef}>My name is:</h3>
          <h1 ref={contentRef}>
            {isLoading ? people[currentNumber].profile.firstName : "Loading..."}
          </h1>
          <summary className="icons">
            {icons.map((each) => {
              const { id, icon } = each;
              return (
                <div
                  className="icons-con"
                  style={iconStyle === id ? { color: "#49a6e9" } : {}}
                  key={id}
                  onMouseOver={() => handleHover(id)}
                  onMouseOut={() => setIconStyle(null)}
                >
                  {icon}
                </div>
              );
            })}
          </summary>
          <button className="random-btn" onClick={handleClick}>
            {isLoading ? "RANDOM USER" : "Loading..."}
          </button>
        </div>
      </section>
    </>
  );
};

export default Card;
