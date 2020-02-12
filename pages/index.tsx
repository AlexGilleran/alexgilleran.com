import Head from "next/head";
import { ReactNode } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Alex Gilleran</title>
      </Head>
      <div className="container mx-auto max-w-screen-md px-4">
        <header>
          <h1 className="text-4xl text-center">Alex Gilleran</h1>
        </header>

        <section className="section">
          <p>
            I am a principal software engineer and tech lead based in Sydney, Australia,
            currently working at{" "}
            <NewWindowLink href="https://data61.csiro.au">
              CSIRO's Data61
            </NewWindowLink>{" "}
            as well as hacking{" "}
            <NewWindowLink href="https://nichetester.com">
              NicheTester
            </NewWindowLink>{" "}
            and{" "}
            <a href="#projects" className="link">
              other projects
            </a>{" "}
            on the side.
          </p>
        </section>

        <section className="section">
          <h2 className="section__title">Contact / Social Media</h2>
          <address>
            <table className="table-auto">
              <tbody>
                <tr>
                  <th className="contact-table__cell">Email:</th>
                  <td className="contact-table__cell">
                    <a className="link" href="mailto:alex@alexgilleran.com">
                      alex@alexgilleran.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <th className="contact-table__cell">Github:</th>
                  <td className="contact-table__cell">
                    <NewWindowLink href="https://github.com/AlexGilleran">
                      AlexGilleran
                    </NewWindowLink>
                  </td>
                </tr>
                <tr>
                  <th className="contact-table__cell">Medium:</th>
                  <td className="contact-table__cell">
                    <NewWindowLink href="https://medium.com/@alexgilleran></tr>">
                      @AlexGilleran
                    </NewWindowLink>
                  </td>
                </tr>
                <tr>
                  <th className="contact-table__cell">Twitter:</th>
                  <td className="contact-table__cell">
                    <NewWindowLink href="https://twitter.com/AlexGilleran></tr>">
                      @AlexGilleran
                    </NewWindowLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </address>
        </section>

        <section className="section" id="projects">
          <h2 className="section__title">Notable Projects</h2>

          <Project title="Magda Data Catalog" link="https://magda.io">
            Magda is an open-source data catalog intended to relieve problems
            around data cataloguing and discovery in large organisations,
            particularly the Australian Government. It's developed as a
            microservices application that runs on top of Kubernetes, and makes
            use of Typescript, Scala, Postgres and ElasticSearch. Currently,
            Magda is the software that powers the front page of{" "}
            <NewWindowLink href="https://data.gov.au">
              data.gov.au
            </NewWindowLink>
            , serving 10-20,000 users every week.
          </Project>

          <Project title="NicheTester" link="https://nichetester.com">
            NicheTester is a tool designed for testing out niche online business
            ideas, consisting of a business canvas generator that feeds into a
            landing page generator, built using Next.js and Firebase.
          </Project>

          <Project
            title="JSX Control Statements"
            link="https://github.com/AlexGilleran/jsx-control-statements"
          >
            JSX Control Statements is a babel plugin that adds conventional
            templating control statements (If, For, When) to React's JSX.
            Although it's a bit obsolete in the world of Create React App and
            ubiquitous typescript, it's gotten over 1200 Github stars.
          </Project>

          <Project title="TerriaJS" link="https://terria.io">
            TerriaJS is a library for building geospatial data explorers on top
            of a 3D globe powered by Cesium. It's for a range of applications,
            most notably on{" "}
            <NewWindowLink href="https://nationalmap.gov.au">
              Australia's National Map
            </NewWindowLink>
            .
          </Project>

          <Project
            title="Hills Carpal"
            link="https://github.com/RHoKAustralia/hills-carpal"
          >
            Hills Carpal is a web application that enables volunteers from Hills
            Community Aid to give lifts to senior citizens who would otherwise
            find it difficult to get about. It's based on a React frontend and
            an AWS Lambda backend.
          </Project>

          <Project
            title="IceSoap"
            link="https://github.com/AlexGilleran/IceSoap"
          >
            IceSoap is a library for Android that enables easy communication
            with SOAP-based web services - currently with 77 Github stars.
          </Project>

          <Project title="Watch Me Grow" link="https://watchmegrow.care">
            Watch Me Grow was a simple web application to enable earlier
            detection of early development difficulties in children, by
            distribution questionnaires to parents and advising them to see
            their pediatrician if there was any concern with the answers.
          </Project>

          <Project
            title="HIIT Me"
            link="https://play.google.com/store/apps/details?id=com.alexgilleran.hiitme&hl=en_AU"
          >
            HIIT Me is an Android app for timing High Intensity Interval
            Training workouts - it enabled custom programs to be created, which
            are then read out via text-to-speech, so that the user can be
            prompted as to what they should do as they listen to music.
          </Project>
        </section>
      </div>
    </>
  );
}

function NewWindowLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link ${props.className || ""}`}
    >
      {props.children}
    </a>
  );
}

function Project(props: { title: string; link: string; children: ReactNode }) {
  return (
    <section className="mb-3 mt-1">
      <h3 className="text-lg font-semibold">
        {props.title} -{" "}
        <NewWindowLink href={props.link} className="font-normal">
          {props.link}
        </NewWindowLink>
      </h3>
      <p className="mt-1">{props.children}</p>
    </section>
  );
}
