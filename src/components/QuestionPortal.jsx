"use client";

import React, { useState, useEffect } from 'react';

import { SPEAKERS_DATA } from '../data/speakersData';

import { SITE_SETTINGS, resolveAsset } from '../data/siteSettings';

const speakersList = SPEAKERS_DATA.map((speaker, index) => ({
  id: index,
  name: speaker.name,
  img: resolveAsset(speaker.img)
}));


const QuestionPortal = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [question, setQuestion] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      setVisibleCount(isMobile && isPortrait ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleSpeakers = speakersList.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + visibleCount < speakersList.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSpeaker || !question.trim()) {
      alert("Please select a speaker and type a question.");
      return;
    }

    const { formUrl, entrySpeaker, entryQuestion } = SITE_SETTINGS.questionPortal;
    const formData = new FormData();
    formData.append(entrySpeaker, selectedSpeaker);
    formData.append(entryQuestion, question);

    fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })

      .then(() => {
        setIsSuccess(true);
      })
      .catch((err) => {
        console.error("Submission error:", err);
        alert("Something went wrong. Please try again.");
      });
  };

  const handleReset = () => {
    setIsSuccess(false);
    setQuestion("");
    setSelectedSpeaker(null);
    setStartIndex(0);
  };

  return isSuccess ? (
    <div className="qs_page__ffsqe">
      <div className="qs_successBox__0pj5J">
        <h1>Question Submitted Successfully!</h1>
        <p>Thank you for participating. Your question has been submitted and will be addressed by the speaker.</p>
        <button className="qs_primaryBtn__Zbsb- qs_centerBtn__L5RAh" onClick={handleReset}>
          Submit Another Question
        </button>
      </div>
    </div>
  ) : (
    <div className="qs_page__ffsqe">
      <div className="qs_hero__x4+QX">
        <div className="qs_heroCircle__9JVYB">
          <img src={resolveAsset("/static/media/markimage.bcbafff0e2e3db143111.jpg")} alt="TED" />
        </div>
        <div className="qs_heroText__DNdVV">
          <h1>Couldn't Attend? Ask Your Question Here.</h1>
          <p>This official portal ensures non-attendees have their questions heard. Submit now and our speakers will address the most impactful ones during the talk.</p>
        </div>
      </div>

      <div className="qs_section__zABcf">
        <h2 className="qs_sectionTitle__WFK0t">Select Speaker</h2>
        <div className="qs_carousel__jY2Zp">
          <button className="qs_arrow__Cf78S" onClick={handlePrev} disabled={startIndex === 0}>
            &lt;
          </button>
          <div className="qs_speaker-grid__6XV76">
            {visibleSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className={`qs_speakerCard__F4hh1 ${selectedSpeaker === speaker.name ? 'qs_active__pS266' : ''}`}
                onClick={() => setSelectedSpeaker(speaker.name)}
              >
                <img src={speaker.img} alt={speaker.name} className="qs_speakerImage__KpOCa" />
                <span className="qs_speakerName">{speaker.name}</span>
              </div>
            ))}
          </div>
          <button className="qs_arrow__Cf78S" onClick={handleNext} disabled={startIndex + visibleCount >= speakersList.length}>
            &gt;
          </button>
        </div>
      </div>

      <div className="qs_section__zABcf">
        <h2 className="qs_sectionTitle__WFK0t">Your Question</h2>
        <textarea
          className="qs_text__WeYLb"
          placeholder="Enter your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className="qs_primaryBtn__Zbsb- qs_centerBtn__L5RAh" onClick={handleSubmit}>
          Submit Question
        </button>
      </div>
    </div>
  );
};

export default QuestionPortal;
