import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({projects}) => {
    return (
        <div className="project-list section">

            {/* If we have projects do .map if not don't do .map */}
           {projects && projects.map(project => {
               return(
                   <Link to={'/project/' + project.id} key={project.id}>
                   <ProjectSummary project={project} />
                   </Link>
               )
           })}
           {/* Adding ProjectSummary component and as prop we add "project" and project.id  as a key*/}

        </div>
    )
}

export default ProjectList