curl --location --request POST 'https://leetcode.com/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ","variables":{"username":"piyushjain1857"}}'
