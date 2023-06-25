import './Footer.css'


export default function Footer() {

    return <div className='footer'>
        <div className='github-link'>
            <span id='get'>Get</span><span id='together'>Together</span>
            <a href='https://github.com/MineevSerghei/GetTogether' target='_blank' className='footer-icon'><i className="fa-brands fa-github"></i></a></div>
        <div className='developer-div'>
            <p>Developed by:</p> <a className='footer-name-link' href='https://mineevserghei.github.io/' target='_blank' > Serghei Mineev</a>
            <a href='https://www.linkedin.com/in/serghei-mineev/' target='_blank' className='footer-mini-icon'><i className="fa-brands fa-linkedin"></i></a>
            <a href='https://github.com/MineevSerghei' target='_blank' className='footer-mini-icon'><i className="fa-brands fa-github"></i></a>

        </div>
    </div>


}
