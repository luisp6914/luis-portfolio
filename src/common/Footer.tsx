import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
    return (
        <footer className=" ms-5 me-5">
          <ul className="nav justify-content-center border-bottom border-dark pb-3 mb-3">
            <li className="nav-item">
              <a href="https://www.linkedin.com/in/luis-perez-5941b91a5/" className="nav-link px-2">
                <Icon className="fa-linkedin" icon="akar-icons:linkedinv1-fill" width="40" height="40"  style={{color: '#1387fa'}} />
              </a>
            </li>
            <li className="nav-item repoLink">
              <a href="https://github.com/luisp6914" className="nav-link px-2 ">
              <Icon className="fa-square-github" icon="jam:github" width="40" height="40"  style={{color: '#8a63d2'}} />
              </a>
            </li>
          </ul>
          <p className="text-center text-body-secondary" style={{fontFamily: "time"}}>By Luis Perez</p>
        </footer>
    );
}

export default Footer;