import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="homePage">
      <div>
        <h2 className="homePage--heading">Privacy Policy</h2>

        <h3 className="homePage--subHeading">
          Protecting your Information is Important to us
        </h3>
        <ul className="homePage__list">
          <li className="homePage__list--item">
            Landing Page is public and posts are immediately viewable and
            searchable by anyone around the world. You can also use Landing Page
            under a pseudonym if you prefer not to use your name.
          </li>
          <li className="homePage__list--item">
            We give you control through your settings to limit the data we
            collect from you and how we use it, and to control things like
            account security, marketing preferences, apps that can access your
            account, and address book contacts you’ve uploaded to Landing Page.
            You can also download information you have shared on Landing Page.
          </li>
          <li className="homePage__list--item">
            In addition to information you share with us, we use your posts,
            content you’ve read, Liked, or disliked, and other information to
            determine what topics you’re interested in, your age, the languages
            you speak, and other signals to show you more relevant content. We
            give you transparency into that information, and you can modify or
            correct it at any time.
          </li>
          <li className="homePage__list--item">
            If you have questions about this policy, how we collect or process
            your personal data, or anything else related to our privacy
            practices, we want to hear from you. You can contact us at any time.
          </li>
        </ul>
      </div>
    </section>
  );
}
