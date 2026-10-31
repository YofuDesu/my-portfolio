import React, { useState } from "react"
import profileImage from "../../images/profile.jpg"
import projects from "../data/projects"
import skills from "../data/skills";
import achievements from "../data/achievement"
import menuItems from "../data/menu"
import inventoryItems from "../data/inventoryItems"
import windowContent from "../data/windowcontent"
import guildInfo from "../data/guild"


export default function Home() {
  const [activeWindow, setActiveWindow] = useState(null)
  const [selectedSkill, setSelectedSkill] = useState(skills)
  const [focusedNode, setFocusedNode] = useState(null)
  const [selectedInventoryItem, setSelectedInventoryItem] =
  useState(inventoryItems[0])

  const renderSkillNode = (node) => (
  <div className="skill-node-wrapper" key={node.id}>
    <button
      type="button"
      className={`skill-node ${
        selectedSkill.id === node.id ? "selected" : ""
      }`}
      onClick={() => {
        setSelectedSkill(node)

        if (node.children?.length > 0) {
          setFocusedNode(node)
        }
      }}
    >
      {node.name}
      <small>LV. {node.level}/10</small>
    </button>

    {node.children?.length > 0 && (
      <div className="skill-node-children">
        {node.children.map((child) => renderSkillNode(child))}
      </div>
    )}
  </div>
)

  return (
    <main className="game-page">
      <section className="game-container">
        <header className="game-header">
          <div>
            <p className="eyebrow">PLAYER RANK</p>
            <h1>ROOKIE ADVENTURER</h1>
          </div>
          <div className="nes-badge level-badge">
            <span className="is-warning">LV. 26</span>
          </div>
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
                <progress
                  className="nes-progress is-success"
                  value="85"
                  max="100"
                />
              </div>
            </div>

            <div className="stat">
              <div className="stat-label">
                <span>MP</span>
                <span>60 / 100</span>
              </div>
              <div className="stat-track">
                <progress
                  className="nes-progress is-primary"
                  value="60"
                  max="100"
                />
              </div>
            </div>

            <div className="stat">
              <div className="stat-label">
                <span>EXP</span>
                <span>35 / 100</span>
              </div>
              <div className="stat-track">
                <progress
                  className="nes-progress is-warning"
                  value="35"
                  max="100"
                />
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
              type="button"
              className="nes-btn menu-button"
              onClick={() => setActiveWindow(item.id)}
            >
            <span className="menu-icon">
              <img src={item.icon} alt="" />
            </span>
            {item.label}
                        </button>
          ))}
        </nav>

        
        {activeWindow && (
          <div
            className="modal-backdrop"
            onClick={() => setActiveWindow(null)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setActiveWindow(null)
            }}
            role="presentation"
          >
          <div
            className="game-modal quest-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              type="button"
              className="close-button"
              onClick={() => setActiveWindow(null)}
              aria-label="Close menu"
            >
              X
            </button>

              <p className="eyebrow">ADVENTURER MENU</p>

              {activeWindow === "quests" ? (
                <>
                  <h2 id="modal-title">QUEST LOG</h2>
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
                              <span className="exp-reward">
                                <i className="nes-icon coin is-small"></i>
                                +{project.exp} EXP
                              </span>

                              <span
                                className={`quest-check ${isCompleted ? "is-completed" : "is-pending"}`}
                                title={isCompleted ? "COMPLETED QUEST" : "ONGOING QUEST"}
                              >
                                {isCompleted ? "✔" : "□"}
                              </span>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              ) : activeWindow === "skills" ? (
                <>
                  <h2 id="modal-title">SKILL TREE</h2>
                  <p className="quest-intro">
                    Explore my programming abilities and unlocked skills!
                  </p>

                  <div className={`skill-tree ${focusedNode ? "zoomed-in" : ""}`}>

                    {!focusedNode ? (
                      /* MAIN TREE VIEW */
                      <div className="skill-overview">
                        <div className="skill-root">
                          <button
                            type="button"
                            className="skill-node main-node"
                            onClick={() => {
                              setSelectedSkill(skills)
                              setFocusedNode(skills)
                            }}
                          >
                            ✦ {skills.name}
                            <small>LV. {skills.level}/10</small>
                          </button>
                        </div>

                        <div className="tree-connector" />

                        <div className="skill-branches">
                          {skills.children.map((branch) => (
                            <div className="skill-branch" key={branch.id}>
                              <button
                                type="button"
                                className={`skill-node branch-node ${
                                  selectedSkill.id === branch.id ? "selected" : ""
                                }`}
                                onClick={() => {
                                  setSelectedSkill(branch)
                                  setFocusedNode(branch)
                                }}
                              >
                                {branch.name}
                                <small>LV. {branch.level}/10</small>
                                <span className="zoom-hint">CLICK TO EXPLORE ↗</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* ZOOMED TREE VIEW */
                      <div className="skill-focus-view" key={focusedNode.id}>
                        <button
                          type="button"
                          className="nes-btn back-skill-button"
                          onClick={() => {
                            setFocusedNode(null)
                            setSelectedSkill(skills)
                          }}
                        >
                          ← BACK TO SKILL TREE
                        </button>

                        <div className="focused-skill-root">
                          {renderSkillNode(focusedNode)}
                        </div>

                        <p className="focus-hint">
                          SELECT A NODE TO VIEW ITS INFORMATION
                        </p>
                      </div>
                    )}

                    {/* SKILL DETAILS */}
                    <div className="skill-details nes-container is-rounded">
                      <p className="eyebrow">SKILL INFORMATION</p>

                      <h3>{selectedSkill.name}</h3>

                      <p className="skill-level">
                        LEVEL: {selectedSkill.level}/10
                      </p>

                      <div className="skill-stat">
                        <div className="skill-info">
                          <strong>KNOWLEDGE</strong>
                          <span>{selectedSkill.knowledge}/10</span>
                        </div>

                        <progress
                          className="nes-progress is-success"
                          value={selectedSkill.knowledge}
                          max="10"
                        />
                      </div>

                      <div className="skill-stat">
                        <div className="skill-info">
                          <strong>EXPERIENCE</strong>
                          <span>{selectedSkill.experience}/10</span>
                        </div>

                        <progress
                          className="nes-progress is-warning"
                          value={selectedSkill.experience}
                          max="10"
                        />
                      </div>

                      <div className="skill-description">
                        <h4>DESCRIPTION</h4>
                        <p>{selectedSkill.description || " "}</p>

                        <h4>EFFECT</h4>
                        <p>{selectedSkill.effect || " "}</p>

                        <h4>UTILIZED IN</h4>
                        <p>{selectedSkill.utilizedIn || " "}</p>
                      </div>
                    </div>

                  </div>
                </>
                ) : activeWindow === "inventory" ? (
                  <>
                    <h2 id="modal-title">INVENTORY</h2>

                    <p className="quest-intro">
                      Tools and equipment collected throughout my development journey.
                    </p>

                    <div className="inventory-layout">

                      {/* INVENTORY SLOTS */}
                      <div className="inventory-grid">

                        {Array.from({ length: 12 }, (_, index) => {
                          const item = inventoryItems[index]

                          return (
                            <button
                              key={index}
                              type="button"
                              disabled={!item}
                              className={`inventory-slot ${
                                selectedInventoryItem?.id === item?.id
                                  ? "selected"
                                  : ""
                              } ${!item ? "empty-slot" : ""}`}
                              onClick={() => {
                                if (item) setSelectedInventoryItem(item)
                              }}
                              aria-label={item ? item.name : "Empty inventory slot"}
                            >
                              {item && (
                                <>
                                  <span className="inventory-icon">
                                  <img
                                    src={`${__PATH_PREFIX__}${item.icon}`}
                                    alt={`${item.name} icon`}
                                  />
                                  </span>

                                  <span className="inventory-item-name">
                                    {item.name}
                                  </span>
                                </>
                              )}

                              <span className="slot-number">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </button>
                          )
                        })}

                      </div>

                      {/* SELECTED ITEM INFORMATION */}
                      <div className="inventory-details nes-container is-rounded">

                        <p className="eyebrow">ITEM INFORMATION</p>

                        {selectedInventoryItem ? (
                          <>
                            <h3>{selectedInventoryItem.name}</h3>

                            <span className="inventory-type">
                              {selectedInventoryItem.type}
                            </span>

                            <div className="inventory-description">
                              <h4>DESCRIPTION</h4>
                              <p>{selectedInventoryItem.description}</p>
                            </div>
                          </>
                        ) : (
                          <p>Select an item from your inventory.</p>
                        )}

                      </div>

                    </div>
                  </>
                ) : activeWindow === "achievements" ? (
                  <>
                    <h2 id="modal-title">ACHIEVEMENTS</h2>

                    <p className="quest-intro">
                      Milestones and experience earned throughout my journey.
                    </p>

                    <div className="achievement-list">
                      {achievements.map((achievement) => (
                        <article
                          className="achievement-card"
                          key={achievement.id}
                        >
                          <div className="achievement-heading">
                            <i className="nes-icon trophy is-small"></i>
                            <h3>{achievement.title}</h3>
                          </div>

                          <h4>{achievement.subtitle}</h4>

                          <p className="achievement-organization">
                            {achievement.organization} · {achievement.date}
                          </p>

                          {Array.isArray(achievement.description) ? (
                            <ul>
                              {achievement.description.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{achievement.description}</p>
                          )}
                        </article>
                      ))}
                    </div>
                  </>
                ) : activeWindow === "guild" ? (
                  <>
                    <h2 id="modal-title">GUILD HALL</h2>

                    <p className="quest-intro">
                      A recruitment notice from an adventurer seeking a new party.
                    </p>
                    <div className="guild-status nes-container is-rounded">
                      <div>
                        <p className="eyebrow">PLAYER STATUS</p>
                        <h3>
                          <span className="status-indicator"></span>
                          {guildInfo.status}
                        </h3>
                      </div>
                      <i className="nes-icon star is-medium"></i>
                    </div>
                    <div className="guild-section quest-board">
                      <h3 className="guild-section-title">
                        <i className="nes-icon trophy is-small"></i>
                        CURRENT QUEST
                      </h3>

                      <div className="guild-quest-content">
                        <p>{guildInfo.currentQuest}</p>
                        <span className="quest-rank">QUEST RANK: OPEN</span>
                      </div>
                    </div>
                      <div className="guild-section">
                        <h3 className="guild-section-title">PREFERRED ROLES</h3>

                        <div className="technology-list">
                          {guildInfo.preferredRoles.map((role) => (
                            <span key={role}>{role}</span>
                          ))}
                        </div>
                      </div>
                    <div className="guild-section">
                      <h3 className="guild-section-title">PREFERRED WORK SETUP</h3>

                      <div className="guild-tags">
                        {guildInfo.workSetup.map((setup) => (
                          <span className="work-tag" key={setup}>
                            {setup}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="guild-section">
                      <h3 className="guild-section-title">SERVICES FOR HIRE</h3>

                      <div className="guild-services">
                        {guildInfo.services.map((service, index) => (
                          <div className="guild-service" key={service}>
                            <span className="service-number">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="guild-section contact-board">
                      <h3 className="guild-section-title">ESTABLISH CONTACT</h3>

                      <p className="contact-intro">
                        Interested in forming a party? Send me a message!
                      </p>

                      <div className="guild-contacts">
                        {guildInfo.contacts.map((contact) => (
                          <a
                            key={contact.name}
                            href={contact.url}
                            className="guild-contact"
                            target={contact.name === "EMAIL" ? undefined : "_blank"}
                            rel={contact.name === "EMAIL" ? undefined : "noopener noreferrer"}
                          >
                            <span className="contact-name">{contact.name}</span>
                            <span className="contact-value">{contact.value}</span>
                            <span className="contact-arrow">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="guild-footer">
                      <p>READY TO START A NEW ADVENTURE?</p>
                        <a
                          href={guildInfo.contacts[0].url}
                          className="nes-btn is-success"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          SEND A MESSAGE
                        </a>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>{windowContent[activeWindow].title}</h2>
                    <p>{windowContent[activeWindow].text}</p>
                  </>
                )}
            </div>
          </div>
        )}

      </section>
    </main>
  )
}
