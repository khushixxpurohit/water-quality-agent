from workflows.graph import graph

png_data = graph.get_graph().draw_mermaid_png()

with open("workflow.png", "wb") as f:
    f.write(png_data)

print("Workflow image saved as workflow.png")