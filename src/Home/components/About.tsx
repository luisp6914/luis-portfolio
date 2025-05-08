const About = () => {
    return (
        <div className="about-me">
            <div className="paragraph mt-0">
              <h3>About Me</h3>
              <div>
                  <p>
                    I hold a B.S. in Computer Science and have a strong passion for both front-end and back-end development. 
                    My portfolio website showcases my full-stack development skills through a complete web application. The 
                    frontend is built with React and Vite, and deployed on GitHub Pages. I use GitHub Secrets to securely manage 
                    environment variables, such as API keys and backend endpoints.
                  </p>
                  <p>
                    The backend is developed using Java with Spring Boot, and Maven for dependency and build management. 
                    While the application initially used MySQL, I migrated to PostgreSQL to simplify Docker container deployment 
                    and avoid the paywall associated with deploying MySQL on platforms like Render.com.
                  </p>
                  <p>
                    This setup highlights my ability to build secure and scalable applications, integrating a modern frontend with 
                    a robust Java-based backend and persistent PostgreSQL database.
                  </p>
                  <p>
                    Additionally, when I'm not coding, you'll often find me immersed in video games and embracing 
                    the challenges they offer. I also have a passion for basketball, 
                    whether it's playing a pickup game with friends or watching the latest Lakers Game.
                  </p>
                  <p>
                    Graduating from college marked the beginning of an exciting chapter in my life, and I can't 
                    wait to embark on my career. I'm eager to contribute to innovative projects, collaborate 
                    with talented individuals, and continue learning and growing in this ever-evolving field. 
                  </p>
              </div>
            </div>
              
            <div className="profile">         
              <img src="ghibli-img.png" className="img-thumbnail img-me" alt="Image of me"></img>
            </div>

        </div>
      );
}

export default About;