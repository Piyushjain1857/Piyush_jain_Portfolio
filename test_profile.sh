curl --location --request POST 'https://leetcode.com/graphql' \
--header 'Content-Type: application/json' \
--data-raw '{"query":"\n    query userPublicProfile($username: String!) {\n  matchedUser(username: $username) {\n    profile {\n      ranking\n      userAvatar\n      realName\n      aboutMe\n    }\n  }\n}\n    ","variables":{"username":"piyushjain1857"}}'
