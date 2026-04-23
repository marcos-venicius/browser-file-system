import { Directory, File } from "~/types";

export const root = Directory.create(
  '/',
  ['/'],
  [
    Directory.create(
      'socials',
      ['/', 'socials'],
      [
        File.create(
          'github.com',
          ['/', 'socials', 'github.com'],
          `https://github.com/marcos-venicius/


Hi , I'm Marcos!

A passionate and skilled software engineer.

## Liked topics

- Compilers 🔥 Love this topic
- Interpreters 🔥 Love this topic
- C, Assembly, GO, Rust, Nim, Python, ...
- Low Level
- Cyber Security
- CTFs
- Reverse Engineering
- Languages (Native Portuguese, Advanced English, Basic French)

### Projects you may like

* [CLIBs (various libraries, including a statically typed search language) for C](https://github.com/marcos-venicius/clibs) 🔥 In development
* [The JSON successor?](https://github.com/marcos-venicius/evalset) 🔥 In development
* [SAS a x86_64 compiled language written in python](https://github.com/marcos-venicius/sas-language) ⏳ In progress
* [A vim-based todo list tracking system](https://github.com/marcos-venicius/wodo) 🔥 In development
* [Advent Of Code Solutions](https://github.com/marcos-venicius/aoc) ⏳ In progress
* [My automation for dev env creation](https://github.com/marcos-venicius/config-manager) 🔥 In development
* [LFI. A log filter that uses quang language](https://github.com/marcos-venicius/lfi) ✅️ Ready to use (limited for a single log format for now)
* [Tmuxer. A custom tmux setup language to automate your panels](https://github.com/marcos-venicius/tmuxer) ✅️ Ready to use
* [Query Language for C# (used in production environments)](https://github.com/marcos-venicius/quang-csharp) ✅️ Available at [NuGet](https://www.nuget.org/packages/Quang/2.0.0)
* [A math expression compiler in C](https://github.com/marcos-venicius/MCA) ✅️ Working with basic math expressions
* [Hacking Tools](https://github.com/marcos-venicius/hacking-tools) ✅️ One of my most used repos
* [JSON parser for C](https://github.com/marcos-venicius/cson) ✅️ Ready to use (we don't have an api yet, but you can format and minify json)
* [SMLF (Small Machine Learning Framework) only with python and math](https://github.com/marcos-venicius/smlf)
* [Machine Learning Framework in C](https://github.com/marcos-venicius/ML-hello-world/)
* [Command Shrink](https://github.com/marcos-venicius/command-shrink)
* [X. A dbml too so I can have intermediate SQL and convert to any format](https://github.com/marcos-venicius/x) ⏸️ Development paused for now

> [!WARNING]
> Vim is the best editor ever! 😉`
        ),
        File.create(
          'linkedin.com',
          ['/', 'socials', 'linkedin.com'],
          `https://www.linkedin.com/in/venicius-marcos/

I am a software engineer with over half a decade of experience developing applications ranging from simple, lightweight solutions to complex and scalable systems.

I have worked in different contexts: from multidisciplinary squads of more than 15 people to strategic initiatives led by select individuals, where I took responsibility for creating new products within the company.

I have worked with a wide range of technologies that cover most of today’s web development market, and I have also had the opportunity to innovate by building AI technologies from scratch and serving as the main contributor to process automation tools that generated real operational efficiency gains.

I like to say that I am a polyglot — I speak Portuguese, English, and more than a dozen programming languages. A few years ago, I began to see technology as a tool: each language, framework, or architecture is simply a means to solve a specific problem in an efficient, secure, and scalable way.

No matter where I go, I am known for learning anything faster than anyone else, and that has taken me to incredible places.

I love working with programming because I enjoy turning what seems impossible into something tangible, usable, and secure.

Throughout my career, I have worked both as a developer and as a Tech Lead. Although I have experience in technical leadership, my greatest strength is as a developer — transforming business needs into real, functional, and scalable products.

I love challenges and I am always learning something new to deliver the best product humanly possible.

Keep Learning!`
        )
      ]
    )
  ]
)
