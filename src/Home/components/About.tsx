const About = () => {
    return (
        <div className="about-me">
            <div className="paragraph mt-0">
              <h3>About Me</h3>
              <div>
                  <p>
                    I have a B.S. in Computer Science with passion for both front-end and back-end development. My portfolio website showcases 
                    my full-stack development skills through a complete web application. The frontend is built with React and Vite, and is deployed 
                    on GitHub Pages. I use GitHub Secrets to securely manage environment variables, including API keys and 
                    backend endpoints. The backend is developed using Java with Spring Boot and Maven to manage dependencies and builds, while MySQL 
                    serves as the relational database. This setup demonstrates my ability to integrate secure frontend deployment with a robust, 
                    Java-based backend and persistent data storage.
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