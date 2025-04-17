const fetchAgentDataSerivce = require("../../services/agentService/agentService");
const socketIo = require('socket.io');
const express = require('express');
const http = require('http');


const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const fetchAllAgentController = (req, res) => {
    fetchAgentDataSerivce.fetchAllAgentService((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}


const fetchAllResponsesController = (req, res) => {
    fetchAgentDataSerivce.fetchfetchAllResponsesService((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}

const fetchAllComponentController = (req, res) => {
    fetchAgentDataSerivce.fetchAllComponentService((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}


const addNewAgentController = (req, res) => {
    const {
        name,
        category,
        agent_prompt,
        inputType,
        outputType,
        modal,
        accuracy,
        status,
        purpose,
        system_prompt,
        user_prompt,
        api,
        temperature,
    } = req.body;
    fetchAgentDataSerivce.addNewAgentService(name,
        category,
        agent_prompt,
        inputType,
        outputType,
        modal,
        accuracy,
        status,
        purpose,
        system_prompt,
        user_prompt,
        api,
        temperature, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        });
}

const createNewUserController = (req, res) => {
    const user_agent = req.body;
    fetchAgentDataSerivce.createNewUserService(user_agent, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}

const fetchAgentDataController = (req, res) => {
    const { agent_id } = req.body;
    fetchAgentDataSerivce.fetchAgentDataService(agent_id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const updateAgentLinksController = (req, res) => {
    const { agent_id, linkedAgents } = req.body;
    fetchAgentDataSerivce.updateAgentLinksService(agent_id, linkedAgents, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const fetchAllNodeEdgesController = (req, res) => {
    fetchAgentDataSerivce.fetchAllNodeService((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else {
            fetchAgentDataSerivce.fetchAllEdgesService((err, results1) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                else {
                    res.json({ node: results, edges: results1 });
                }
            });
        }
    });
};

const fetchAllSectionController = (req, res) => {
    fetchAgentDataSerivce.fetchAllSectionService((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};


const fetchAllCategorieForSectionController = (req, res) => {
    const { section_id } = req.body;
    fetchAgentDataSerivce.fetchAllCategorieForSectionService(section_id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};


const fetchAllPromptsForCategorieController = (req, res) => {
    const { category_id } = req.body;
    fetchAgentDataSerivce.fetchAllPromptsForCategorieService(category_id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};


const fetchAllPromptController = (req, res) => {
    fetchAgentDataSerivce.fetchAllPromptServiceService((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

const deleteAllAgentesController = (req, res) => {
    fetchAgentDataSerivce.deleteAllAgentesService((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};


const fetchAllPromptTemplateForPromptController = (req, res) => {
    const { prompt_id } = req.body;
    fetchAgentDataSerivce.fetchAllPromptTemplateForPromptService(prompt_id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};


function replaceAllSquareBracketText(text, replacement) {
    return text.replace(/\[.*?\]/g, replacement);
}


// const fetchResponseOfPrompt = async (req, res) => {
//     const { textInputUser, PromtArrat } = req.body;
//     let currentTextInput = textInputUser;
//     let result = []
//     try {
//         for (const prompt of PromtArrat) {
//             const properPrompt = replaceAllSquareBracketText(prompt.prompt, textInputUser)
//             const response = await fetchAgentDataSerivce.generarteResponseService(currentTextInput, properPrompt);
//             if (response && response.choices && response.choices.length > 0) {
//                 currentTextInput = response.choices[0].message.content;
//                 result.push({
//                     prompt_text: properPrompt,
//                     response_text: response.choices[0].message.content
//                 })
//                 let agentdata = {
//                     agent_id: Math.floor(Math.random() * 50) + 1,
//                     prompt_text: properPrompt,
//                     response_text: response.choices[0].message.content
//                 }
//                 fetchAgentDataSerivce.storeAgentResponseService(agentdata, (err, results) => {
//                     if (err) {
//                         return res.status(500).json({ error: err.message });
//                     }
//                 });
//             } else {
//                 throw new Error(`No valid response for ${prompt}`);
//             }
//         }
//         res.json({ message: 'All prompts processed successfully', result });
//     } catch (error) {
//         res.status(500).json({ error: 'Error processing the prompts', details: error.message });
//     }
// }


const fetchResponseOfPrompt = async (req, res) => {
    const { textInputUser, PromtArrat } = req.body;
    let currentTextInput = textInputUser;
    let result = [];
    let label=PromtArrat[0].label


    try {
        // Process each prompt one by one
        for (const prompt of PromtArrat) {
            const properPrompt = prompt.prompt.replace(/\[.*?\]/g, textInputUser);
            const response = await fetchAgentDataSerivce.generarteResponseService(currentTextInput, properPrompt);

            if (response && response.choices && response.choices.length > 0) {
                currentTextInput = response.choices[0].message.content;
                const responseData = {
                    agent_id: Math.floor(Math.random() * 50) + 1,
                    prompt_text: properPrompt,
                    response_text: currentTextInput
                };

                // Stream response via SSE
                //sendSSEMessage(responseData);

                result.push(responseData);

                // Store response
                fetchAgentDataSerivce.storeAgentResponseService(responseData,label, (err) => {
                    if (err) console.error('Error storing agent data:', err);
                });
            } else {
                throw new Error(`No valid response for ${prompt.prompt}`);
            }
        }

        res.json({ message: 'All prompts processed successfully', result });
    } catch (error) {
        console.error('Error processing prompts:', error);
        res.status(500).json({ error: 'Error processing the prompts', details: error.message });
    }
};


const fetchResponseOfPromptVertex = async (req, res) => {
    const { textInputUser, PromtArrat,temperatureinput,modelinput } = req.body;
    let currentTextInput = textInputUser;
    let model = modelinput;
    let temperature = temperatureinput;
    let label=PromtArrat[0].label
    let result = [];
  
    try {
      for (const prompt of PromtArrat) {
        const properPrompt = prompt.prompt.replace(/\[.*?\]/g, textInputUser);
        const response = await fetchAgentDataSerivce.generarteResponseServiceVertex(currentTextInput, properPrompt,model,temperature );
  
        if (response && response.choices && response.choices.length > 0) {
          currentTextInput = response.choices[0].message.content;
  
          const responseData = {
            agent_id: Math.floor(Math.random() * 50) + 1,
            prompt_text: properPrompt,
            response_text: currentTextInput,
          };
  
          // Stream response via SSE (Uncomment if needed)
          // sendSSEMessage(responseData);
  
          result.push(responseData);
  
          // Store response
          fetchAgentDataSerivce.storeAgentResponseService(responseData,label, (err) => {
            if (err) console.error("Error storing agent data:", err);
          });
        } else {
          throw new Error(`No valid response for ${prompt.prompt}`);
        }
      }
  
      res.json({ message: "All prompts processed successfully", result });
    } catch (error) {
      console.error("Error processing prompts:", error);
      res.status(500).json({ error: "Error processing the prompts", details: error.message });
    }
  };

module.exports = {
    fetchAgentDataController,
    addNewAgentController,
    fetchResponseOfPrompt,
    fetchAllAgentController,
    fetchAllResponsesController,
    createNewUserController,
    fetchAllComponentController,
    fetchAllSectionController,
    fetchAllCategorieForSectionController,
    fetchAllPromptsForCategorieController,
    fetchAllPromptTemplateForPromptController,
    fetchAllPromptController,
    deleteAllAgentesController,
    updateAgentLinksController,
    fetchAllNodeEdgesController,
    fetchResponseOfPromptVertex
};