import React, { useState } from "react";

interface Props {
  intro?: string;
  title: string;
  contentMission: string;
  missionList: Array<string>;
  contentCompetences: Array<string>;
  profilContent: Array<string>;
  conditions: Array<string>;
}

const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <p
        className={isOpen ? "title title-active" : "title"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {"Informations personnelles"}{" "}
        <span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.812 17.2462C21.6718 17.415 21.48 17.4994 21.2875 17.4994C21.1138 17.4994 20.9401 17.4304 20.8027 17.2907L12.0038 8.39822L3.19904 17.2909C2.90887 17.5855 2.4562 17.5671 2.18969 17.2464C1.92183 16.9272 1.93996 16.4318 2.22944 16.1372L11.515 6.70947C11.7898 6.43018 12.2096 6.43018 12.4846 6.70947L21.7701 16.1372C22.0576 16.4331 22.0799 16.9271 21.812 17.2462Z"
              fill="black"
            />
          </svg>
        </span>
      </p>
      <div className={isOpen ? "content--active" : "content"}>
        <p className="intro">text</p>
      </div>
    </div>
  );
};
export default Accordion;
