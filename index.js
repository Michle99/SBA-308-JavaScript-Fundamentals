// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
};
  
// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
    {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
    },
    {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
    },
    {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
    }
    ]
};
  
// The provided learner submission data.
const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
];


// Learner Data function to get user data
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  const courseID = CourseInfo.id;
  const assignmentGroupID = AssignmentGroup.id;
  const assignments = AssignmentGroup.assignments;
  const groupWeight = AssignmentGroup.group_weight;
  const assignmentScores = {};

  const learnerData = {};

  // Check submissions and find date of submitted assignments
  for (const submission of LearnerSubmissions) {
    const learnID = submission.learner_id;
    const assignmentID = submission.assignment_id;
    const submissionDate = new Date(submission.submission.submitted_at);
    
    // Find the assignment with specified ID
    const assignment = assignments.find((assignment) => assignment.id === assignmentID);

    if (!assignment) {
      console.warn(`Assignment with ID ${assignmentID} not found. Skipping submission.`);
      continue; // Skip this submission if the assignment is not found.
    }

    const dueDate = new Date(assignment.due_at);

    if (courseID !== AssignmentGroup.course_id) {
      throw new Error("Invalid input: AssignmentGroup does not belong to the course.");
    }

    if (submissionDate > dueDate) {
      const score = submission.submission.score;
      const pointsPossible = assignments.find(
        (assignment) => assignment.id === assignmentID
      ).points_possible;
    
      if (pointsPossible === 0) {
        throw new Error("Invalid input: points_possible cannot be 0.");
      }

      if (typeof score !== "number" || isNaN(score)) {
        throw new Error("Invalid input: Submission score must be a number.");
      }

      if (!learnerData[learnID]) {
        learnerData[learnID] = {
          id: learnID,
          totalScore: 0,
          totalWeight: 0,
        };
      }

      learnerData[learnID].totalScore += (score / pointsPossible) * pointsPossible;
      learnerData[learnID].totalWeight += pointsPossible;
      assignmentScores[assignmentID] = (score / pointsPossible) * 100;

    }
  }

  // const results = [];

  // for (const learnerID in learnerData) {
  //   const learner = learnerData[learnerID];
  //   const weightedAverage = (learner.totalScore / learner.totalWeight) * 100;

  //   const learnerResult = {
  //     id: learner.id,
  //     avg: weightedAverage,
  //   }

  //   for (const assignment of assignments) {
  //     if (assignmentScores[assignment.id]) {
  //       learnerResult[assignment.id] = assignmentScores[assignment.id];
  //     }
  //   }

  //   results.push(learnerResult);
  // }

  // return results;
}


const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);