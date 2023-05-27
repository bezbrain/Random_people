import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { icons } from "../data";

let currentNumber = 0;

const Card = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iconStyle, setIconStyle] = useState(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  let displayDetails = [
    // people[currentNumber].profile.firstName,
    // people[currentNumber].email,
    // people[currentNumber].profile.gender,
    // people[currentNumber].profile.address,
    // people[currentNumber].profile.phoneNumber,
    // people[currentNumber].socials.facebook,
  ];

  useEffect(() => {
    const getData = async () => {
      setIsLoading(false);
      try {
        const { data } = await axios.get(
          "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users"
        );
        setPeople(data);
        // displayDetails = [
        //   people[currentNumber].profile.firstName,
        //   people[currentNumber].email,
        //   people[currentNumber].profile.gender,
        //   people[currentNumber].profile.address,
        //   people[currentNumber].profile.phoneNumber,
        //   people[currentNumber].socials.facebook,
        // ];
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
        setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  };

  const handleHover = (index) => {
    setIconStyle(iconStyle === index ? null : index);
    let getContent = contentRef.current;

    icons.forEach((each) => {
      const { id, iconName, icon } = each;
      if (id === index) {
        console.log(iconName);
        if (iconName === "user") {
          getContent.textContent = people[currentNumber].profile.firstName;
        } else if (iconName === "email") {
          getContent.textContent = people[currentNumber].email;
        } else if (iconName === "gender") {
          getContent.textContent = people[currentNumber].profile.gender;
        } else if (iconName === "address") {
          getContent.textContent = people[currentNumber].profile.address;
        } else if (iconName === "phone") {
          getContent.textContent = people[currentNumber].profile.phoneNumber;
        } else {
          getContent.textContent = people[currentNumber].socials.facebook;
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
          <h3>Each person details:</h3>
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
                  ref={iconRef}
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
