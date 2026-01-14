name: Feature Request
description: Suggest an idea for this project
title: "[FEATURE]: "
labels: ["enhancement"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a new feature! Please provide as much detail as possible.

  - type: textarea
    id: feature-description
    attributes:
      label: Feature Description
      description: A clear and concise description of the feature you'd like to see
      placeholder: What feature would you like to add?
    validations:
      required: true

  - type: textarea
    id: problem-solved
    attributes:
      label: Problem Statement
      description: What problem does this feature solve?
      placeholder: What problem would this solve?
    validations:
      required: true

  - type: textarea
    id: proposed-solution
    attributes:
      label: Proposed Solution
      description: How do you envision this feature working?
      placeholder: How should this feature work?
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Have you considered any alternative solutions or features?
      placeholder: Any alternative approaches?

  - type: dropdown
    id: priority
    attributes:
      label: Priority
      description: How important is this feature to you?
      options:
        - Low - Nice to have
        - Medium - Would improve experience
        - High - Important for my workflow
        - Critical - Must have feature
    validations:
      required: true

  - type: textarea
    id: additional-context
    attributes:
      label: Additional Context
      description: Add any other context, mockups, or examples about the feature request here
      placeholder: Any additional information, mockups, or examples

  - type: checkboxes
    id: terms
    attributes:
      label: Confirmation
      description: Please confirm the following
      options:
        - label: I have searched for similar feature requests
          required: true
        - label: I have provided enough detail to understand the request
          required: true