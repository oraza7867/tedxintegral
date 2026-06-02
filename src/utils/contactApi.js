const APPS_SCRIPT_URL = "link add krna hai";

/**
 * Submits the contact form data to the Google Apps Script Web App.
 * @param {Object} formData Form fields: { firstName, lastName, email, phone, message, newsletter }
 * @returns {Promise<boolean>} Resolves to true if successful, throws error otherwise.
 */
export async function submitContactForm(formData) {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // With no-cors, response.ok is false and response.type is 'opaque'.
    // We assume it succeeded if the fetch itself resolved without throwing.
    return true;
  } catch (error) {
    console.error("API submission error:", error);
    throw error;
  }
}
