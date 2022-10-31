import React from "react";
import { Github_URL } from "../utils/Links";

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white font-modern mx-36 mb-10">
        <h1 className="my-5 mx-auto text-5xl text-main-red">About</h1>
        <div className="flex flex-col bg-contrast-gray mt-8 hover:shadow-light p-5">
          <h3 className="text-4xl">Our Purpose</h3>
          <div className="flex flex-col mt-2 text-xl">
            <p className="mb-1.5">This website was created to provide the ESG ratings information of some of the largest publicly traded companies in the United States. It reflects the ESG ratings of hundreds of public companies listed on either the NYSE or Nasdaq, most of which are included in the S&P 500.</p>
            <p className="mt-1.5">The mission of this website is to: raise awareness of the importance of sustainability, facilitate socially responsible investing, and incentivize companies to create value for our society through responsible and ethical business practices.</p>
          </div>
        </div>
        <div className="flex flex-col bg-contrast-gray mt-8 hover:shadow-light p-5">
          <h3 className="text-4xl">Tips for Users</h3>
          <ul className="mt-2 text-xl">
            <li className="mb-1.5">&#x2022; For a company’s own description of its ESG practices, click on the company SEC filings link on the company profile page and select the company’s most recent proxy statement for its annual meeting where you will find disclosures about the company’s governance matters.</li>
            <li className="mb-1.5">&#x2022; Additionally, click on the link to the company’s own website on the company profile page and navigate to its investor relations page. On the investor relations pages, you will find lots of additional information about the company, including, in some cases, their own sustainability reports.</li>
            <li className="mb-1.5">&#x2022; To contact a company’s board of directors with concerns about the company’s ESG performance, search on the company’s investor relations page or in the company’s proxy statement for the contact information for the company’s board of directors. Many companies separately include this information to allow interested parties to contact their board.</li>
          </ul>
        </div>
        <div className="flex flex-col mt-10 bg-contrast-gray hover:shadow-light p-5">
          <h3 className="text-3xl">The Design</h3>
          <div className="flex flex-col text-xl mt-2">
            <p>This website was built with MongoDB, ExpressJS, React, and NodeJS, all in TypeScript. It was styled with TailwindCSS.</p>
            <p>See Github Page: <a className="text-blue-600" href={Github_URL}>ESG Compare</a> for more detailed information on the code.</p>
          </div>
        </div>
        <div className="flex flex-col mt-10 bg-contrast-gray hover:shadow-light p-5">
          <h3 className="text-3xl">About</h3>
          <div className="flex flex-col text-xl mt-2">
            <p>This website was built by Alistair King.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;