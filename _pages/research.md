---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

{% include base_path %}
{% for post in site.workingpapers %}
  {% include archive-single.html type="list" show_date=false %}
{% endfor %}
