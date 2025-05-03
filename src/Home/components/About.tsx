const About = () => {
    return (
        <div className="about-me">
            <div className="paragraph mt-0">
              <h3>About Me</h3>
              <div>
                  <p>
                    I have a B.S. in Computer Science with passion for both front-end and back-end development. In a previous role as an AWS team leader, we improved our workflow by implementing AWS Secrets Manager, which bolstered
                    our security measures. In another role, I developed webpages using HTML, CSS, and JavaScript. Additionally, I assisted with daily
                    tasks by updating product information for an e-commerce company, ensuring the website's content remained accurate and up-to-date
                  </p>
                  <p>
                    When I'm not coding, you'll often find me immersed in video games and embracing 
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
              <img src="/ghibli-img.png" className="img-thumbnail img-me" alt="Image of me"></img>
            </div>

        </div>
      );
}

export default About;