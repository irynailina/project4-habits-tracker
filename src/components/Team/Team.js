import React from 'react';
import style from './team.module.css';
// import teamInfo from './team.json';
import teamData from './teamData';
import { v4 as uuidv4 } from 'uuid';

function Team() {
  return (
    <section className={style.ourTeam}>
      <h2 className={style.title}>Our team</h2>
      <button className={style.goback}>
        <a href="/home">Go to homepage</a>
      </button>
      <ul className={style.ourTeamList}>
        {teamData.map(personalData => (
          <li key={uuidv4()} className={style.ourTeamItem}>
            <ul className={style.Wrapper}>
              <li key={uuidv4()} className={style.Img}>
                <img
                  src={personalData.image}
                  alt="Team member"
                  width="350"
                  height="350"
                />
              </li>
              <li key={uuidv4()} className={style.name}>
                {personalData.name}
              </li>
              <li key={uuidv4()} className={style.position}>
                {personalData.position}
              </li>
              <li key={uuidv4()} className={style.socialLink}>
                <div className={style.overlay}>
                  <ul className={style.socialLinkWrapper}>
                    <li key={uuidv4()} className={style.link}>
                      <a
                        href={personalData.sociallist.git}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          enableBackground="new 0 0 24 24"
                          // fill="#555"
                          height="40px"
                          viewBox="0 0 24 24"
                          width="40px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z" />
                        </svg>
                      </a>
                    </li>
                    <li key={uuidv4()} className={style.link}>
                      <a
                        href={personalData.sociallist.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          height="40px"
                          viewBox="0 0 512 512"
                          width="40px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm-74.390625 387h-62.347656v-187.574219h62.347656zm-31.171875-213.1875h-.40625c-20.921875 0-34.453125-14.402344-34.453125-32.402344 0-18.40625 13.945313-32.410156 35.273437-32.410156 21.328126 0 34.453126 14.003906 34.859376 32.410156 0 18-13.53125 32.402344-35.273438 32.402344zm255.984375 213.1875h-62.339844v-100.347656c0-25.21875-9.027343-42.417969-31.585937-42.417969-17.222656 0-27.480469 11.601563-31.988282 22.800781-1.648437 4.007813-2.050781 9.609375-2.050781 15.214844v104.75h-62.34375s.816407-169.976562 0-187.574219h62.34375v26.558594c8.285157-12.78125 23.109375-30.960937 56.1875-30.960937 41.019531 0 71.777344 26.808593 71.777344 84.421874zm0 0" />
                        </svg>
                      </a>
                    </li>
                    <li key={uuidv4()} className={style.link}>
                      <a
                        type="email"
                        href={personalData.sociallist.email}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          id="Capa_1"
                          enableBackground="new 0 0 512 512"
                          height="40px"
                          viewBox="0 0 512 512"
                          width="40px"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m187 390c0-112.968.1-126.93 0-126.98-.2-.06-3.28-.02-42.53-.02-8.1 0-15.09-6.22-15.45-14.31-.39-8.59 6.47-15.69 14.98-15.69 39.66 0 42.8.04 43-.02.1-.05 0-12.775 0-110.98 0-8.28 6.72-15 15-15h169.02c-39.58-41.19-94.91-66-155.02-66-119.1 0-216 96.45-216 215s96.9 215 216 215c60.08 0 115.42-24.79 155.02-66h-169.02c-8.28 0-15-6.72-15-15zm-59-221h23.53c8.1 0 15.09 6.22 15.45 14.31.39 8.59-6.47 15.69-14.98 15.69h-23.53c-8.1 0-15.09-6.22-15.45-14.31-.39-8.59 6.47-15.69 14.98-15.69zm16 158h-47.53c-8.1 0-15.09-6.22-15.45-14.31-.39-8.59 6.47-15.69 14.98-15.69h47.53c8.1 0 15.09 6.22 15.45 14.31.39 8.59-6.47 15.69-14.98 15.69z" />
                            <path d="m491.77 137h-255.558l129.652 99.956z" />
                            <path d="m375.327 267.748c-5.382 4.273-13.009 4.354-18.485.131l-139.842-107.81v199.931c0 8.284 6.716 15 15 15h265c8.284 0 15-6.716 15-15v-200.756z" />
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Team;
