---
layout: archive
title: "Research"
permalink: /research/
description: "Working papers and publications on international relations, conflict, authoritarian politics, political elites, and applications of large language models (LLMs) in social science."
author_profile: true
---

{% include base_path %}

## Working Papers
{% for post in site.workingpapers %}
  {% include archive-single.html type="list" show_date=false %}
{% endfor %}
