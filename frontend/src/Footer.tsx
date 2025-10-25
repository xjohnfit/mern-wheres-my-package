const Footer = () => {
    return (
        <footer className='text-center text-gray-500 py-4'>
            <div>
                © {new Date().getFullYear()} Where's My Package. All rights
                reserved.
            </div>
            <div>
                <a href='/privacy' className='text-gray-500 hover:underline'>
                    Privacy Policy
                </a>
                <span className='mx-2'>|</span>
                <a href='/terms' className='text-gray-500 hover:underline'>
                    Terms of Service
                </a>
            </div>
            <div>
              This is a demo project for educational purposes.
            </div>
            <div>
              <p className='text-gray-500'>
                Built with ❤️ using React, TypeScript, and Tailwind CSS.
              </p>
            </div>
        </footer>
    );
};
export default Footer;
