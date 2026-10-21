---
title: "LLM-Powered Systems for Data Collection of Political Actors in Natural Disasters"
status: ongoing
order: 4
authors:
  - Sara Mitchell
  - Elise Pizzi
  - Anh-Tu Ngo
---

How can large language models (LLMs) assist with iterative, multi-step data coding? Many data collection efforts require human coders to read multiple documents (e.g., policy documents, news articles, and other reports), adjudicate discrepancies across sources, search for additional information, assign values to variables, and double-check their work. Collecting data on natural disasters and government disaster responses exemplifies this process. For each disaster, coders must reconcile reports of its consequences that often vary by source, decide which values to trust, and determine which information belongs in which variable. To code disaster responses, they must also identify the actions of various political actors and organizations, classify each actor by type, and record its name, type, and actions in the appropriate variables. The process is complex and time-consuming, and each additional step raises the risk of error. We experiment with an agentic LLM system to accelerate this work. The system consists of two agents: a coder and a checker. The coder reads multiple documents at once, extracts details relevant to the variables of interest (along with their sources), notes any discrepancies or missing values across sources, and enters values for the corresponding variables. The checker then reviews the sources and the coded data, identifies remaining discrepancies and missing details, decides on and runs web searches for additional documents to resolve them, and either updates the variables or keeps them unchanged. We apply this two-agent system to 200 cases of natural disasters and government responses and compare its output with (1) human-coded data and (2) human-coded data validated by experts.
