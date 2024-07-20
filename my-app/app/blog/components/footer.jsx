const Footer = () => {
    return (
      <footer className="bg-white py-10">
        <div className="container mx-auto flex flex-wrap justify-between items-start">
          <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
            <img src="/path/to/logo.png" alt="Froker Logo" className="w-24 mx-auto sm:mx-0" />
          </div>
          <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-2">Quicklink</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">Home</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">About us</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">Privacy policy</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:text-orange-500">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-2">Contacts</h3>
            <p className="text-gray-600">Whitefield, Bengaluru, 560066</p>
            <p className="text-gray-600 mb-4"><a href="mailto:support@froker.in" className="text-orange-500 hover:underline">support@froker.in</a></p>
            <div className="flex space-x-4">
              <a href="#"><img src="/path/to/twitter.png" alt="Twitter" className="w-6 h-6" /></a>
              <a href="#"><img src="/path/to/linkedin.png" alt="LinkedIn" className="w-6 h-6" /></a>
              <a href="#"><img src="/path/to/instagram.png" alt="Instagram" className="w-6 h-6" /></a>
              <a href="#"><img src="/path/to/youtube.png" alt="YouTube" className="w-6 h-6" /></a>
            </div>
          </div>
          <div className="w-full sm:w-1/4">
            <h3 className="text-xl font-bold mb-2">Scan To Download</h3>
            <img src="/path/to/qr-code.png" alt="QR Code" className="w-32 mx-auto sm:mx-0" />
          </div>
        </div>
        <div className="bg-orange-500 text-white text-center py-4 mt-6">
          <p>© 2024 Arroz Technology. All rights reserved</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  