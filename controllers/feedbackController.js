import Feedback from "../models/Feedback.js";

// Add Feedback
export const addFeedBack = async (req, res) => {
  const { email, name, message } = req.body;

  try {
    const newFeedback = await Feedback.create({
      email,
      name,
      message,
    });

    const feedbackCount = await Feedback.countDocuments();

    if (feedbackCount > 20) {
      // Find and delete the oldest feedback(s) to maintain only 20 feedbacks
      await Feedback.find({})
        .sort({ createdAt: 1 }) 
        .limit(feedbackCount - 20) // Get the extra feedbacks beyond 20
        .then(async (oldFeedbacks) => {
          for (let feedback of oldFeedbacks) {
            await Feedback.findByIdAndDelete(feedback._id);
          }
        });
    }

    return res.status(201).json({
      status: 'success',
      message: 'Feedback added',
      data: newFeedback,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`,
    });
  }
};

export const getFeedBack = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(20); // Limit the result to the 20 most recent feedbacks

    return res.status(200).json({
      status: 'success',
      data: feedbacks,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`,
    });
  }
};
