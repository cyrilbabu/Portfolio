import Skills from "../(components)/Skills";
import AchievementsPage from "./achievements/page";
import CertificationPage from "./certifications/page";
import EducationPage from "./education/page";
import ExperiencePage from "./experience/page";
import ProjectsPage from "./projects/page";

const AboutPage = () => {
  return (
    <>
      <ExperiencePage />
      <ProjectsPage />
      <Skills />
      <AchievementsPage />
      <EducationPage />
      <CertificationPage />
    </>
  );
};

export default AboutPage;
