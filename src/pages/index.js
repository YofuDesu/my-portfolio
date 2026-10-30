import React, { useState } from "react"
import profileImage from "../../images/profile.jpg"
import projects from "../data/projects"

const menuItems = [
  { id: "quests", label: "QUEST LOG", icon: "📜" },
  { id: "skills", label: "SKILL TREE", icon: "⚔️" },
  { id: "inventory", label: "INVENTORY", icon: "🎒" },
  { id: "achievements", label: "ACHIEVEMENTS", icon: "🏆" },
  { id: "guild", label: "GUILD HALL", icon: "🏰" },
]

const windowContent = {
  quests: {
    title: "QUEST LOG",
    text: "A collection of projects and challenges I'm working on.",
  },
  skills: {
    title: "SKILL TREE",
    text: "My programming languages, frameworks, and technical skills.",
  },
  inventory: {
    title: "INVENTORY",
    text: "The tools and technologies I use to build things.",
  },
  achievements: {
    title: "ACHIEVEMENTS",
    text: "Certificates, milestones, and accomplishments.",
  },
  guild: {
    title: "GUILD HALL",
    text: "A little more about me, plus ways to get in touch.",
  },
}

export default function Home() {
  const [activeWindow, setActiveWindow] = useState(null)

  return (
    <main className="game-page">
      <section className="game-container">
        <header className="game-header">
          <div>
            <p className="eyebrow">PLAYER RANK</p>
            <h1>ROOKIE ADVENTURER</h1>
          </div>
          <span className="level-badge">LV. 26</span>
        </header>

        <div className="dashboard">
          <section className="profile-panel">
            <div className="avatar-frame">
              <img
                src={profileImage}
                alt="My profile portrait"
                className="profile-picture"
              />
            </div>

            <h2>BRIGET JOHN GOCOTANO</h2>
            <p className="character-class">CLASS: FULLSTACK DEVELOPER</p>
            <p className="character-subclass">SUBCLASS: NOT YET UNLOCKED</p>
            <p className="guild-name">GUILD: NONE</p>

            <hr />

            <h3>PASSIVE SKILLS</h3>
            <ul className="passive-skills">
              <li>✦ Problem Solving</li>
              <li>✦ Creativity</li>
              <li>✦ Teamplayer</li>
              <li>✦ Clean Code</li>
              <li>✦ Adaptability</li>
            </ul>
          </section>

          <section className="stats-panel">
            <h2>CHARACTER STATUS</h2>

            <div className="stat">
              <div className="stat-label">
                <span>HP</span>
                <span>85 / 100</span>
              </div>
              <div className="stat-track">
                <div className="stat-fill hp-fill" />
              </div>
            </div>

            <div className="stat">
              <div className="stat-label">
                <span>MP</span>
                <span>60 / 100</span>
              </div>
              <div className="stat-track">
                <div className="stat-fill mp-fill" />
              </div>
            </div>

            <div className="stat">
              <div className="stat-label">
                <span>EXP</span>
                <span>35 / 100</span>
              </div>
              <div className="stat-track">
                <div className="stat-fill exp-fill" />
              </div>
            </div>

            <div className="quest-card">
              <p className="eyebrow">CURRENT QUEST</p>
              <h3>Build My Personal Portfolio</h3>
              <p>Mission: Enhance my skills as a developer and create a portfolio that showcases my work. </p>
              <span className="quest-status">IN PROGRESS</span>
            </div>
          </section>
        </div>

        <nav className="game-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="menu-button"
              onClick={() => setActiveWindow(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        
        {activeWindow && (
          <div
            className="modal-backdrop"
            onClick={() => setActiveWindow(null)}
          >
            <section
              className="game-modal quest-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="close-button"
                onClick={() => setActiveWindow(null)}
              >
                X
              </button>

              <p className="eyebrow">ADVENTURER MENU</p>

              {activeWindow === "quests" ? (
                <>
                  <h2>QUEST LOG</h2>
                  <p className="quest-intro">
                    These are my completed and ongoing adventures!
                  </p>

                  <div className="project-list">
                    {projects.map((project) => {
                      const isCompleted = project.status?.toLowerCase().includes("completed");

                      return (
                        <article
                          className={`project-card ${isCompleted ? "completed-quest" : ""}`}
                          key={project.id}
                        >
                          <div className="project-heading">
                            <h3>{project.title}</h3>
                            <span>{project.status}</span>
                          </div>

                          <p>{project.description}</p>

                          <div className="technology-list">
                            {project.technologies.map((tech) => (
                              <span key={tech}>{tech}</span>
                            ))}
                          </div>

                          <div className="project-footer">
                            <div className="project-links">
                              {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer">
                                  GITHUB ↗
                                </a>
                              )}

                              {project.demo && (
                                <a href={project.demo} target="_blank" rel="noreferrer">
                                  {project.demo.includes("roblox.com") ? "PLAY GAME ↗" : "LIVE DEMO ↗"}
                                </a>
                              )}
                            </div>

                            <div className="quest-reward">
                              <span className="exp-reward">+{project.exp} EXP</span>

                              <span
                                className={`quest-check ${isCompleted ? "is-completed" : ""}`}
                                title={isCompleted ? "COMPLETED QUEST" : "ONGOING QUEST"}
                              >
                                {isCompleted ? "✓" : "□"}
                              </span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <h2>{windowContent[activeWindow].title}</h2>
                  <p>{windowContent[activeWindow].text}</p>
                </>
              )}
            </section>
          </div>
        )}

      </section>
    </main>
  )
}
